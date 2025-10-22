import { insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { HiOutlineSun } from "react-icons/hi";

// https://www.blocknotejs.org/docs/features/custom-schemas/custom-blocks
// https://www.blocknotejs.org/docs/react/components/suggestion-menus#changing-slash-menu-items

export const insertWeatherItem = (editor) => ({
  title: "Insert Weather",
  onItemClick: () =>
    insertOrUpdateBlock(editor, {
      type: "weather",
      content: [],
      props: { forcast: "Sunny" },
    }),
  aliases: ["weather", "rain", "snow", "sun", "clouds"],
  group: "Other",
  icon: <HiOutlineSun size={18} />,
  subtext: "Used to insert a block with 'weather' below.",
});

export const createWeather = createReactBlockSpec(
  {
    type: "weather",
    content: "inline",
    propSchema: {
      forecast: {
        default: "Rainy",
        values: ["Rainy", "Sunny", "Cloudy", "Snowy"],
      },
    },
  },
  {
    render: (props) => {
      return (
        <div className="weather-block">
          {props.block.props.forecast} weather in the forecast!
        </div>
      );
    },
  }
);
