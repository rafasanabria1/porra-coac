export function HeadingH2({children, className}: {className?: string; children: React.ReactNode}) {
  return (
    <h2
      className={`${className} scroll-m-20 text-center text-xl font-semibold tracking-tight first:mt-0 lg:text-3xl`}
    >
      {children}
    </h2>
  );
}

export function HeadingH3({className, children}: {className?: string; children: React.ReactNode}) {
  return (
    <h2
      className={`${className} text-md scroll-m-20 text-center font-semibold tracking-tight first:mt-0 lg:text-xl`}
    >
      {children}
    </h2>
  );
}

export function HeadingH4({className, children}: {className?: string; children: React.ReactNode}) {
  return (
    <h2
      className={`${className} lg:text-md scroll-m-20 text-left text-sm font-semibold tracking-tight first:mt-0`}
    >
      {children}
    </h2>
  );
}
