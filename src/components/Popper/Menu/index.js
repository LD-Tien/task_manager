import Tippy from "@tippyjs/react/headless";
import {followCursor} from 'tippy.js/headless';
import styles from "./Menu.module.scss";
import Popper from "..";
import Button from "../../Button";

function Menu({ trigger, followMouse, placement="bottom", items = [], children }) {
  return (
    <div>
      <Tippy
        trigger={trigger}
        interactive
        followCursor={!!followMouse ? followMouse : false}
        plugins={[followCursor]}
        placement={placement}
        render={(attrs) => (
          <div className={styles["menu-list"]} tabIndex="-1" {...attrs}>
            <Popper>
              {items.map((item, index) => {
                let jsx;
                if (!!item.headerTitle) {
                  jsx = (
                    <h2 className={styles["header-title"]}>
                      {item.headerTitle}
                    </h2>
                  );
                } else if (!!item.options) {
                  jsx = (
                    <>
                      {item.options.map((item, index) => {
                        return (
                          <Button key={index} subText={item.subTitle} small item danger={!!item.danger} leftIcon={item.icon}>
                            {item.title}
                          </Button>
                        );
                      })}
                    </>
                  );
                } else if (!!item.customOptions) {
                  jsx = (
                    <Button small item danger={!!item.danger} leftIcon={item.customOptions.icon}>
                      {item.customOptions.title}
                    </Button>
                  );
                }
                return (
                  <div key={index} className={styles["group"]}>
                    {jsx}
                  </div>
                );
              })}
            </Popper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default Menu;