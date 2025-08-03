import { Modal } from "../Modal";
import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";

export const MainLayout = (p: {
  children: React.ReactNode;
  padding?: boolean;
  fillPageExactly?: boolean;
}) => {
  const padding = p.padding ?? true;
  return (
    <main className={`${p.fillPageExactly ? "h-full" : "min-h-full"} ${padding ? "p-6" : ""}`}>
      {p.children}
    </main>
  );
};

export function Layout(p: { children: React.ReactNode; showLeftSidebar: boolean }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        {p.showLeftSidebar && (
          <aside className="min-h-full w-64 overflow-y-auto border-r">
            <LeftSidebar />
          </aside>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto">{p.children}</div>
      </div>
      <Modal />
    </div>
  );
}
