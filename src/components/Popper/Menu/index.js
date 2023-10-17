import Tippy from "@tippyjs/react/headless";
import { followCursor } from "tippy.js/headless";
import styles from "./Menu.module.scss";
import Popper from "..";
import Button from "../../Button";
import moment from "moment";

function Menu({
  trigger,
  followMouse,
  hiddenClickInside = true,
  placement = "bottom",
  items = [],
  children,
  ...props
}) {
  return (
    <div>
      <Tippy
        trigger={trigger}
        interactive
        followCursor={!!followMouse ? followMouse : false}
        plugins={[followCursor]}
        placement={placement}
        onShow={(instance) => {
          hiddenClickInside &&
            setTimeout(() => {
              // "onShown" function not working
              // convert to asynchronous wait for tippy rendered
              const tippyRoot = document.querySelector("[data-tippy-root]");
              if (tippyRoot) {
                tippyRoot
                  .querySelectorAll(".options button")
                  .forEach((button) => {
                    button.addEventListener(
                      "click",
                      () => {
                        instance.hide(); //close tippy when click inside menu
                      },
                      { once: true }
                    );
                  });

                const button = tippyRoot.querySelector(".customOptions button");
                const input = tippyRoot.querySelector(".customOptions input");

                if (button && input) {
                  button.addEventListener("click", () => {
                    input.showPicker();
                  });
                  input.addEventListener(
                    "change",
                    (e) => {
                      if (props.handleUpdate && props.task) {
                        if (props.updateRemind) {
                          props.task.isSendNotification =
                            new Date(e.target.value) - new Date() <= 0;
                          props.task.remind = moment(e.target.value).format();
                        }
                        if (props.updatePlanned) {
                          props.task.planned = moment(e.target.value)
                            .set({ hour: 0, minute: 0, second: 0 })
                            .format();
                        }
                        props.handleUpdate();
                      }
                      instance.hide();
                      tippyRoot.remove();
                    },
                    { once: true }
                  );
                }
              }
            });
        }}
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
                    <div className="options">
                      {item.options.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            small
                            item
                            {...item}
                            onClick={
                              !!item.onClick
                                ? () => {
                                    item.onClick({ ...props });
                                  }
                                : () => {}
                            }
                          >
                            {item.title}
                          </Button>
                        );
                      })}
                    </div>
                  );
                } else if (!!item.customOptions) {
                  jsx = (
                    <div
                      className="customOptions"
                      style={{ margin: "0px", padding: "0px", height: "40px" }}
                    >
                      <Button
                        small
                        item
                        {...item.customOptions}
                        onClick={
                          !!item.customOptions.onClick
                            ? () => item.customOptions.onClick({ ...props })
                            : () => {}
                        }
                      >
                        {item.customOptions.title}
                      </Button>
                      {item.customOptions.inputDateHidden}
                    </div>
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
