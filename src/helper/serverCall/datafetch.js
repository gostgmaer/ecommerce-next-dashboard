import { baseurl } from "@/config/setting";

export async function getCategories() {
    const res = await fetch(baseurl+`/categories`)
    const data = await res.json();
    return data
  }