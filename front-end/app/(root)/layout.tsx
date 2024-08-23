export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
          Sidebar
          Navbar
          {children}
          Footer
        </div>
    );
  }