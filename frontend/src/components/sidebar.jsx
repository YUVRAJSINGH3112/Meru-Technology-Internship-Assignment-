import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  const linkClass =
    "block w-full text-left px-3 py-2 rounded-md transition-colors";

  const activeClass = "bg-muted";
  const inactiveClass = "hover:bg-muted";

  return (
    <aside className="w-64 border-r bg-background p-4 space-y-4">
      <h2 className="text-xl font-semibold">Monefy</h2>

      <nav className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Main Menu
        </p>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
          end
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/invoice/create"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Create Invoices
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Reports
        </NavLink>
      </nav>

      <Separator />

      <nav className="space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Settings
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Help Center
        </NavLink>
      </nav>
    </aside>
  );
}
