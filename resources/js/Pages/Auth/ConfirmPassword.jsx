import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Konfirmasi Password</CardTitle>
                    <CardDescription>
                        Masukan password untuk melanjutkan ke halaman utama
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onHandleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(e.target.name, e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <InputError message={errors.password} />
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
                                    Masuk
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

ConfirmPassword.layout = (page) => (
    <AppLayout children={page} title={"Konfirmasi Password"} />
);
