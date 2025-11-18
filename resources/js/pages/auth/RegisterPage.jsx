import React from "react";
import AuthLayout from "@/layout/AuthLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/register", {
            onSuccess: () => {
                reset("name", "email", "password");
            },
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 px-4">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0">
                        <CardHeader className="space-y-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                            <CardTitle className="text-2xl">
                                ✨ Daftar Akun Baru
                            </CardTitle>
                            <CardDescription className="text-purple-100">
                                Buat akun untuk memulai produktivitas Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {Object.keys(errors).length > 0 && (
                                <div className="mb-4">
                                    <Alert className="bg-red-50 border-red-200">
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                        <AlertTitle className="text-red-800">
                                            Pendaftaran Gagal!
                                        </AlertTitle>
                                        <AlertDescription className="text-red-700">
                                            {Object.values(errors)[0]}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}

                            <div onSubmit={handleSubmit}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel
                                            htmlFor="name"
                                            className="text-gray-700"
                                        >
                                            👤 Nama Lengkap
                                        </FieldLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Masukkan nama lengkap"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className={
                                                errors.name
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel
                                            htmlFor="email"
                                            className="text-gray-700"
                                        >
                                            📧 Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="contoh@email.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className={
                                                errors.email
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel
                                            htmlFor="password"
                                            className="text-gray-700"
                                        >
                                            🔑 Kata Sandi
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Minimal 6 karakter"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.password
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "⏳ Memproses..."
                                                : "🎉 Daftar Sekarang"}
                                        </Button>
                                        <FieldDescription className="text-center mt-4">
                                            Sudah punya akun?{" "}
                                            <Link
                                                href="/auth/login"
                                                className="text-purple-600 hover:text-purple-800 font-semibold hover:underline"
                                            >
                                                Masuk di sini
                                            </Link>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthLayout>
    );
}
