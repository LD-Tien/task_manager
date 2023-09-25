import {
  faArrowDownAZ,
  faEllipsis,
  faFilter,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Toolbar.module.scss";
import Button from "../Button";
import {
  faCalendar,
  faCalendarPlus,
  faStar,
  faSun,
} from "@fortawesome/free-regular-svg-icons";
import { default as MenuPopper } from "../Popper/Menu";

const sort = [
  { headerTitle: "Sort by" },
  {
    options: [
      {
        icon: <FontAwesomeIcon icon={faStar} />,
        title: "Important",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendar} />,
        title: "Due date",
      },
      {
        icon: <FontAwesomeIcon icon={faSun} />,
        title: "Added to My Day",
      },
      {
        icon: <FontAwesomeIcon icon={faArrowDownAZ} />,
        title: "Alphabetically",
      },
      {
        icon: <FontAwesomeIcon icon={faCalendarPlus} />,
        title: "Creation date",
      },
    ],
  },
];

function Toolbar() {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>
        <FontAwesomeIcon icon={faHouse} />
        <p>Tasks</p>
        <Button leftIcon={<FontAwesomeIcon icon={faEllipsis} />} small></Button>
      </div>
      <MenuPopper trigger="click" items={sort}>
        <div>
          <Button leftIcon={<FontAwesomeIcon icon={faFilter} />} small>
            Sort
          </Button>
        </div>
      </MenuPopper>
    </div>
  );
}

export default Toolbar;
