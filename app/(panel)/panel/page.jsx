"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", { method: "GET" });
      if (!response.ok) throw new Error("دریافت تماس‌ها ناموفق بود");

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      toast({
        title: "خطا",
        description: "دریافت تماس‌ها با مشکل مواجه شد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }

    if (isLoaded && isSignedIn && user?.publicMetadata?.role !== "admin") {
      router.push("/not-authorized");
    }

    if (isLoaded && isSignedIn && user?.publicMetadata?.role === "admin") {
      fetchContacts();
    }
  }, [fetchContacts, isLoaded, isSignedIn, user, router]);

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("حذف تماس ناموفق بود");

      setContacts(contacts.filter((contact) => contact._id !== id));
      toast({
        title: "حذف شد",
        description: "تماس با موفقیت حذف شد",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "حذف تماس با مشکل مواجه شد",
        variant: "destructive",
      });
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <p>در حال بررسی دسترسی...</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold">پنل مدیریت</h1>
      <p className="mt-4 text-gray-600">خوش آمدید، {user.username}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">لیست تماس‌ها</h2>
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : contacts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام</TableHead>
                <TableHead>موضوع</TableHead>
                <TableHead>شرکت</TableHead>
                <TableHead>ایمیل</TableHead>
                <TableHead>شماره تماس</TableHead>
                <TableHead>پیام</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>{contact.company || "N/A"}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.message}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteContact(contact._id)}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">هیچ تماسی یافت نشد.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
