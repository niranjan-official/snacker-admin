import Layout from "@/components/Layout";
import { db } from "@/firebase/config";
import { Products } from "@/types";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 0;
const getProducts = async () => {
  try {
    let products: Products[] = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Products, "key">;
      products.push({ key: doc.id, ...data });
      console.log(doc.id, " => ", doc.data());
    });
    return products;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};

export default async function Home() {
  const products: Products[] = await getProducts();
  console.log(products);

  return (
    <div className="flex min-h-screen w-full flex-col px-6 pb-20 bg-slate-200">
      <Layout products={products}/>
    </div>
  );
}
