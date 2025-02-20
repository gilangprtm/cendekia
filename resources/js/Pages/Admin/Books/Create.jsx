import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { IconArrowLeft, IconCategory } from "@tabler/icons-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function Create(props) {
    const fileInput = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: "",
        address: "",
        phone: "",
        email: "",
        logo: null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (sucess) => {
                const flash = flashMessage(sucess);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    const onHandleReset = (e) => {
        reset();
        fileInput.current.value = null;
    };

    return (
        <>
            <div className="flex flex-col w-full pb-32">
                <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_settings.title}
                        subtitle={props.page_settings.subtitle}
                        icon={IconCategory}
                    />

                    <Button variant="orange" size="lg" asChild>
                        <Link href={route("admin.publishers.index")}>
                            <IconArrowLeft className="size-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <form className="space-y-6" onSubmit={onHandleSubmit}>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Nama penerbit"
                                    value={data.name}
                                    onChange={onHandleChange}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="address">Alamat</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    placeholder="Alamat penerbit"
                                    value={data.address}
                                    onChange={onHandleChange}
                                />
                                {errors.address && (
                                    <p className="text-xs text-red-600">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="Telpon penerbit"
                                    value={data.phone}
                                    onChange={onHandleChange}
                                />
                                {errors.phone && (
                                    <p className="text-xs text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="E-mail penerbit"
                                    value={data.email}
                                    onChange={onHandleChange}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    name="logo"
                                    onChange={onHandleChange}
                                    ref={fileInput}
                                />
                                {errors.logo && (
                                    <p className="text-xs text-red-600">
                                        {errors.logo}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end gap-x-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="lg"
                                    onClick={onHandleReset}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="lg"
                                    disabled={processing}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} />
);
