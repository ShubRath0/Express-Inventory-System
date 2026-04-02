import { Header } from "@/components";
import { CardList } from "./Card";

export const Reports = () => {
  return (
    <section className="h-full p-4">
      <div className="flex flex-col gap-4">
        <Header title="Reports" />
        <CardList />
      </div>
    </section>
  );
};
