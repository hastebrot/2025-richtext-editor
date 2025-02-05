import { Breadcrumb, Breadcrumbs, BreadcrumbsProps, Link, LinkProps } from "react-aria-components";
import { classNames } from "../../helpers/clsx";

export const DemoBreadcrumbs = () => {
  return (
    <CarbonBreadcrumbs>
      <CarbonBreadcrumb>
        <CarbonLink>
          <a tabIndex={0}>Home</a>
        </CarbonLink>
      </CarbonBreadcrumb>

      <CarbonBreadcrumb>
        <CarbonLink>
          <a tabIndex={0}>React Aria</a>
        </CarbonLink>
      </CarbonBreadcrumb>

      <CarbonBreadcrumb>
        <CarbonLink>useBreadcrumbs</CarbonLink>
      </CarbonBreadcrumb>
    </CarbonBreadcrumbs>
  );
};

export const CarbonBreadcrumb = Breadcrumb;

export type CarbonBreadcrumbsProps<T> = BreadcrumbsProps<T>;

export const CarbonBreadcrumbs = <T extends object>({
  children,
  ...props
}: CarbonBreadcrumbsProps<T>) => {
  return (
    <Breadcrumbs
      {...props}
      className={classNames(
        "text-token-text-primary",
        "font-[400] text-[14px] leading-[18px]",
        "flex flex-wrap",
        "[&_li]:flex [&_li:not(:last-child)]:after:content-['/'] [&_li:not(:last-child)]:after:mr-2"
      )}
    >
      {children}
    </Breadcrumbs>
  );
};

export type CarbonLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

export const CarbonLink = ({ children, ...props }: CarbonLinkProps) => {
  return (
    <Link
      {...props}
      className={(props) =>
        classNames(
          "flex items-center mr-2 outline-none",
          "font-[400] text-[14px] leading-[18px]",
          !props.isDisabled ? "cursor-pointer text-token-link-primary" : "text-token-text-primary",
          props.isHovered && "text-token-link-primary-hover underline",
          "active:text-[var(--token-text-primary)] active:underline",
          props.isFocused && "outline-1 outline-[var(--token-focus)]"
        )
      }
    >
      {children}
    </Link>
  );
};
