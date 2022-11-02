import {Center, Footer, Select} from "@mantine/core";
import {useFetchPaginatedApi} from "../../../services/api/Api";
import {Store} from "../../../models/Store";
import {useRouter} from "next/router";

export default function UserFooter() {
    const router = useRouter();
    const {storeid} = router.query;
    const {data, error, mutate, isLoading} = useFetchPaginatedApi<Store>(
        '/blogger/stores',
        1,
        100);

    const storeNames = data?.data.map((store) => store.name) ?? [];

    const selectedStore = data?.data.find(store => store.id === storeid);
    // const [value, setValue] = useState<string | null>(null);
    const handleChange = (value: string) => {
        const store = data?.data.find(store => store.name === value);
        if (store) {
            router.push(`/stores/${store?.id}`);
        }
    }
    return (
        <Footer height={60} p="md">
            <Center><Select placeholder={'Select a store'} value={selectedStore?.name ?? ''} onChange={handleChange} data={storeNames}/></Center>
        </Footer>
    );
}
