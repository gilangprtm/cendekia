import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
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
                                <h1 className="text-3xl font-bold">
                                    Lupa Password
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Lupa password kamu? Jangan khawatir.
                                    Beritahu kami apa email kamu dan kami akan
                                    mengirimkan link untuk mereset password di
                                    email tersebut.
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
                                            autoComplete="username"
                                            isFocused={true}
                                            placeholder="exampel@example.com"
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
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="mt-4 block">
                                        <Button
                                            type="submit"
                                            variant="orange"
                                            size="xl"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-4 text-sm text-center">
                                Sudah punya akun?{" "}
                                <Link
                                    href={route("login")}
                                    className="underline"
                                >
                                    Masuk
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
        </>
    );
}

ForgotPassword.layout = (page) => (
    <GuestLayout children={page} title="Lupa Password" />
);
