interface LinkButtonProps {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}

export default function LinkButton({
  href,
  label,
  external = false,
  variant = "outline",
  className = "",
}: LinkButtonProps) {
  const base =
    "inline-block px-4 py-2 text-sm font-medium rounded transition-colors duration-150";
  const styles =
    variant === "primary"
      ? `${base} bg-red-800 text-white hover:bg-red-900`
      : `${base} border border-gray-300 text-gray-800 hover:border-gray-500 hover:bg-gray-50`;

  return (
    <a
      href={href}
      className={`${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}
