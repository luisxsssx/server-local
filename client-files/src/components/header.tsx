interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="container d-flex align-items-center">
      <h1 className="text-center flex-grow-1">{title}</h1>
      <hr />
    </div>
  );
}
