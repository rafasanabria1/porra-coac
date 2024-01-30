export default function HeadingH3({children}: {children: React.ReactNode}) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-center text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}