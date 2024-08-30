import { Separator } from "@/components/ui/separator";
import Table from "./_components/Table";
import { getResources } from '@/db/actions'

export default async function Resources() {
    const resources = await getResources();

    return (
        <div className="p-4">
            <h1 className="px-4 py-2 font-bold uppercase">Shared Resources</h1>
            <Separator />
            <Table resources={resources} />
        </div>
    )
}