import Link from "next/link";


export default async function Page() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Link
        href="/tasks"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#ffffff",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Task Manager
      </Link>
    </div>
  );
}