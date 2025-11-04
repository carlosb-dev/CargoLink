import { Link } from "react-router-dom";

type Props = {
  to: string;
  label: string;
};

function PanelItem({ to, label }: Props) {
  return (
    <li className="py-3">
      <Link to={to} className="block text-slate-100 hover:text-white">
        {label}
      </Link>
    </li>
  );
}

export default PanelItem;

