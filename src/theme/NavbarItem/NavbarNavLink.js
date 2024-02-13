import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'react-tooltip'

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  faIcon,
  ...props
}) {
    return (
      <>
        <a 
          href={to}
          data-tooltip-id={faIcon.iconName}
          data-tooltip-content={label}
          data-tooltip-place="top"
        >
          <FontAwesomeIcon icon={faIcon} />
        </a>
        <Tooltip id={faIcon.iconName} className="starport-tooltip"/>
      </>
    );
}
