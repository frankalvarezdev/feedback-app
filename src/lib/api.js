import { supabase } from "./supabase";

const getTracks = async () => {
    try {
        let { data, error, status } = await supabase.from('tracks').select().order('created_at', { ascending: false });
        if (error && status !== 406) throw error;

        return { error: false, data };
    } catch (error) {
        return { error: error, data: [] };
    }
}

export { getTracks };