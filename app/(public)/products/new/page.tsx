"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@atoms";

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Produk berhasil ditambahkan ✅");
        router.push("/");
      } else {
        const error = await res.json();
        alert("Gagal: " + error.error);
      }
    } catch (err) {
      console.error("Error submit:", err);
      alert("Terjadi kesalahan.");
    }

    setLoading(false);
  };

  return (
    <main className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nama Produk</label>
            <Input
              type="text"
              value={form.name}
              onChange={(value) => {
                setForm({ ...form, name: value})}}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Harga</label>
            <Input
              type="number"
              value={form.price}
              onChange={(value) => {setForm({
                ...form, price: value
              })}}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">URL Gambar</label>
            <Input
              type="text"
              value={form.image}
              onChange={(value) => {setForm({
                ...form, image: value
              })}}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </main>
  );
}
