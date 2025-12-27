<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseFormat;
use App\Http\Requests\TransactionRequest;
use App\Models\Product;
use App\Models\Raw;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ResponseFormat::success(Transaction::with(["items", "items.products"])->orderBy("created_at", "desc")->paginate(15));
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {

                $validated = $request->validated();

                $transaction = Transaction::create([
                    'transaction_total' => $validated['transaction_total'],
                    'transaction_discount' => $validated['transaction_discount'] ?? 0,
                    'transaction_status' => $validated['transaction_status'],
                ]);

                foreach ($validated['items'] as $item) {
                    $transaction->items()->create([
                        'product_id' => $item['item']['product_id'],
                        'item_qty' => $item['qty'],
                    ]);
                }
            });

            return ResponseFormat::success();

        } catch (\Exception $e) {
            Log::error($e);

            if (config('app.debug')) {
                return ResponseFormat::error($e->getMessage());
            }

            return ResponseFormat::error();
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        try {
            return ResponseFormat::success($transaction->load('items.products'));
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransactionRequest $request, Transaction $transaction)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            if ($validated['transaction_status'] === 'paid') {

                $transaction->load([
                    'items.products.recipes'
                ]);

                foreach ($transaction->items as $item) {

                    $itemQty = (int) $item->item_qty;

                    foreach ($item->products->recipes as $recipe) {

                        $totalRawUsed = $recipe->recipe_qty * $itemQty;

                        Raw::where('raw_id', $recipe->raw_id)
                            ->decrement('raw_stock', $totalRawUsed);
                    }
                }
            }

            $transaction->update($validated);

            DB::commit();
            return ResponseFormat::success();

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e);

            if (config('app.debug')) {
                return ResponseFormat::error($e->getMessage());
            }

            return ResponseFormat::error();
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        try {
            $transaction->delete();
            return ResponseFormat::success();
        } catch (\Exception $e) {
            if (env('APP_DEBUG')) {
                return ResponseFormat::error($e->getMessage());
            }
            return ResponseFormat::error();
        }
    }
}
