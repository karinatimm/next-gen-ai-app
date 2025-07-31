import SideNav from "@/components/nav/side-nav";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-3">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore,
          illum ea. Earum ea perferendis autem est consequatur quasi
          voluptatibus necessitatibus corrupti quia pariatur, ratione dolore eos
          eum eius quis voluptas?
        </p>
      </div>
    </div>
  );
};

export default DashboardLayout;
