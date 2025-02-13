import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconArrowLeft, IconCategory } from "@tabler/icons-react";

export default function Create(props) {
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
                        <form className="space-y-6">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Nama kategori"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Deskripsi kategori"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="cover">Cover</Label>
                                <Input id="cover" type="file" name="cover" />
                            </div>
                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant="ghost" size="lg">
                                    Reset
                                </Button>
                                <Button
                                    type="button"
                                    variant="orange"
                                    size="lg"
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
