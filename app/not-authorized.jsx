"use client";

export default function NotAuthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-black text-destructive">
        شما اجازه دسترسی به این بخش را ندارید.
      </h1>
    </div>
  );
}
