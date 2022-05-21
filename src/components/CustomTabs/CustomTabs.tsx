import React, { FC, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTabsetter } from "../../contexts/Tabsetter.context";

const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)({
  width: "100% !important",
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const StyledTab = styled((props: TabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(2),
    color: "rgba(255, 255, 255, 0.7)",
    "&": {
      borderRadius: "12px 12px 0 0",
      backgroundColor: "#EEEDF0",
      border: "1px solid #AEAEAE",
      color: "#838383",
      borderBottom: "0px",
      padding: "8px 12px",
      paddingBottom: "12px",
    },
    "&.Mui-selected": {
      color: "#fff",
      border: "1px solid #21bdba",
      backgroundColor: "#21bdba",
      fontWeight: theme.typography.fontWeightLight,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#FEFEFE",
    },
  })
);

interface ITab {
  label: string;
  icon: React.ReactElement;
}
interface ICustomTabsProps {
  tabs: ITab[];
  disabledTab?: number | null;
  content: React.ReactNode[];
}

export const CustomTabs: FC<ICustomTabsProps> = (props) => {
  const { tabIndex, setTabIndex } = useTabsetter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <StyledTabs value={tabIndex} onChange={handleChange}>
            {props.tabs.map(({ label, icon }, index) => (
              <StyledTab
                label={label}
                iconPosition="start"
                icon={icon}
                key={index}
                disabled={props?.disabledTab === index}
              />
            ))}
          </StyledTabs>
          <span
            style={{
              width: "100%",
              backgroundColor: "#21bdba",
              position: "absolute",
              height: "4px",
              bottom: "0px",
            }}
          />
        </Box>
        <Box
          sx={{
            border: "1px solid #AEAEAE",
            borderTop: "0px",
            padding: "1em",
          }}
        >
          {props.content.map((Ct, index) => (
            <Fragment key={index}>{index === tabIndex ? Ct : null}</Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
