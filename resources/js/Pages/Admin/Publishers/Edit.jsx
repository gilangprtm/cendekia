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

export default function Edit(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.category.name ?? "",
        description: props.category.description ?? "",
        cover: null,
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
        fileInputCover.current.value = null;
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
                        <Link href={route("admin.categories.index")}>
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
                                    placeholder="Nama kategori"
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
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Deskripsi kategori"
                                    value={data.description}
                                    onChange={onHandleChange}
                                />
                                {errors.description && (
                                    <p className="text-xs text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="cover">Cover</Label>
                                <Input
                                    id="cover"
                                    type="file"
                                    name="cover"
                                    onChange={onHandleChange}
                                    ref={fileInputCover}
                                />
                                {errors.cover && (
                                    <p className="text-xs text-red-600">
                                        {errors.cover}
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

Edit.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} />
);
