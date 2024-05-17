import React from "react";
import { RealEstateCardProps } from "./types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
} from "@nextui-org/react";
import { LucideIconWrapper } from "@/components/LucideIconWrapper/LucideIconWrapper";
import { Home } from "lucide-react";
import { Image } from "@nextui-org/react";

export const RealEstateCard = (props: RealEstateCardProps) => {
  const renderImage = () => {
    if (props.imageUrl) {
      return <Image width={300} src={props.imageUrl} />;
    } else {
      return (
        <LucideIconWrapper
          Icon={Home}
          color={{
            light: "#1e1e1e",
            dark: "#e4e4e4",
          }}
          size={150}
        />
      );
    }
  };

  return (
    <Card className="real-estate-card">
      <CardHeader className="real-estate-card__header">
        {renderImage()}
      </CardHeader>
      <CardBody className="real-estate-card__body">
        <h3 className="card_title">{props.title}</h3>
        <p>Price per token: {props.pricePerToken} ETH</p>
        <p>Creator: {props.creator}</p>
      </CardBody>
      <CardFooter className="real-estate-card__footer">
        <Progress
          label={`${props.currentSupply} / ${props.tokenSupply} remaining `}
          color="primary"
          aria-label="supply-remaining"
          value={Math.round((props.currentSupply / props.tokenSupply) * 100)}
          className="progress-bar"
        />
      </CardFooter>
    </Card>
  );
};
