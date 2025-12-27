"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import Loading from "@/components/loading";
import { useEffect } from "react";
import { LogData, useLogStore } from "./stores";
import { formatDate, formatDateTime } from "@/util";
export default function CategoryTable() {
  const { data, current_page, last_page, is_loading, fetchLogs } = useLogStore(
    useShallow((state) => ({
      data: state.data,
      current_page: state.current_page,
      last_page: state.last_page,
      is_loading: state.is_loading,
      fetchLogs: state.fetchLogs,
    }))
  );

  useEffect(() => {
    fetchLogs(1);
  }, []);

  return (
    <div className="flex flex-col ">
      {is_loading ? (
        <Loading />
      ) : (
        <Table className="mb-5 mt-5">
          <TableHeader className="font-bold">
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>User Agent</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Date Time</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((value: LogData, index) => (
              <TableRow key={index}>
                <TableCell className="w-25">{index + 1}</TableCell>
                <TableCell
                  className={
                    value.log_method == "GET"
                      ? "text-green-500"
                      : value.log_method == "POST"
                      ? "text-yellow-400"
                      : value.log_method == "PUT"
                      ? "text-blue-600"
                      : "text-red-600"
                  }
                >
                  {value.log_method}
                </TableCell>
                <TableCell>{value.log_ip}</TableCell>
                <TableCell>{value.log_useragent}</TableCell>
                <TableCell>{value.log_url}</TableCell>
                <TableCell>{formatDateTime(value.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (current_page > 1) {
                  fetchLogs(current_page - 1);
                } else {
                  toast.info("No Data");
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: 3 }, (_, i) => {
              const number = current_page + i;
              if (number > last_page) return;
              return (
                <PaginationLink key={i} onClick={() => fetchLogs(number)}>
                  {number}
                </PaginationLink>
              );
            })}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (current_page < last_page) {
                  fetchLogs(current_page + 1);
                } else {
                  toast.info("No Data ");
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
