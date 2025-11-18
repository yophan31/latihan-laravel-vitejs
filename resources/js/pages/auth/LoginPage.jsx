import React from "react";
import { useForm, usePage } from "@inertiajs/react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const { success } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/login");
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0">
                        <CardHeader className="space-y-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                            <CardTitle className="text-2xl">
                                🔐 Masuk ke Akun Anda
                            </CardTitle>
                            <CardDescription className="text-blue-100">
                                Masukkan kredensial untuk melanjutkan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {success && (
                                <div className="mb-4">
                                    <Alert className="bg-green-50 border-green-200">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <AlertTitle className="text-green-800">
                                            Berhasil!
                                        </AlertTitle>
                                        <AlertDescription className="text-green-700">
                                            {success}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}

                            {errors.email && (
                                <div className="mb-4">
                                    <Alert className="bg-red-50 border-red-200">
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                        <AlertTitle className="text-red-800">
                                            Login Gagal!
                                        </AlertTitle>
                                        <AlertDescription className="text-red-700">
                                            {errors.email}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}

                            <div onSubmit={handleSubmit}>
                                <FieldGroup>
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
                                            placeholder="Masukkan kata sandi"
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
                                        />
                                    </Field>
                                    <Field>
                                        <Button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "⏳ Memproses..."
                                                : "🚀 Masuk"}
                                        </Button>
                                        <FieldDescription className="text-center mt-4">
                                            Belum punya akun?{" "}
                                            <a
                                                href="/auth/register"
                                                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                                            >
                                                Daftar di sini
                                            </a>
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
