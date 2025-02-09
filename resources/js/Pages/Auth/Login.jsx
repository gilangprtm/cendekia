import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <div className="flex flex-col px-6 py-4">
                <ApplicationLogo size="size-12" />
                <div className="flex flex-col items-center justify-center py-12 lg:py-48">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>
                                        {status}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-3xl font-bold">Masuk</h1>
                            <p className="text-balance text-muted-foreground">
                                Masukan email anda dibawah ini untuk masuk ke
                                akun anda
                            </p>
                        </div>
                        <form onSubmit={onHandleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setData(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.email && (
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="ms-auto text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Lupa Password
                                            </Link>
                                        )}
                                    </div>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setData(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.password && (
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <div className="mt-4 block">
                                    <div className="flex items-center">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) =>
                                                setData("remember", checked)
                                            }
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label
                                                htmlFor="remember"
                                                className="ms-2 text-sm text-gray-600"
                                            >
                                                Ingat Saya
                                            </Label>
                                        </div>
                                    </div>
                                    {errors.remember && (
                                        <InputError
                                            message={errors.remember}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="xl"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Masuk
                                </Button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-center">
                            Belum punya akun?{" "}
                            <Link
                                href={route("register")}
                                className="underline"
                            >
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/login.webp"
                    alt="login"
                    className="h-full w-full object-cover dark:brightness-[0.4] dark:grayscale-0"
                />
            </div>
        </div>
    );
}

Login.layout = (page) => <GuestLayout children={page} title="Masuk" />;
