import type { LinksFunction, MetaFunction } from "remix";
import {
  Meta,
  Links,
  Scripts,
  useLoaderData,
  LiveReload,
  useCatch,
} from "remix";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";

// import stylesUrl from "./styles/app.css";

export let links: LinksFunction = () => {
  return [
    // { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: "/fonts/inter/variable.css" },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: "Greg Brimble",
  };
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let data = useLoaderData();

  return (
    <Document>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
