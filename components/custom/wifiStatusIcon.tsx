import React from 'react';
import Wifi1 from "@icons/mobileStatusIcons/wifi_1_icon.svg"
import Wifi2 from "@icons/mobileStatusIcons/wifi_2_icon.svg"
import Wifi3 from "@icons/mobileStatusIcons/wifi_3_icon.svg"
import Wifi4 from "@icons/mobileStatusIcons/wifi_4_icon.svg"

type WifiIconProps = {
  /** Level: 0 to 4 */
  level: 0 | 1 | 2 | 3 | 4;
  size?: number | string;
  className?: string;
};

export const WifiIcon: React.FC<WifiIconProps> = ({
  level,
  size = 32,
  className = '',
}) => {
  return (
    <>
        {level == 1 && (<Wifi1 />)}
        {level == 2 && (<Wifi2 />)}
        {level == 3 && (<Wifi3 />)}
        {level == 4 && (<Wifi4 />)}
    </>
  );
};
