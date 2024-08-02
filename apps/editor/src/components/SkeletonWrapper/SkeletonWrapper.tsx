import { Skeleton } from "@mantine/core";
import React from "react";

export const SkeletonWrapper = ({
	visible,
	children,
}: { visible: boolean; children: React.ReactNode }) => {
	const ItemWrapper = visible ? Skeleton : React.Fragment;
	const itemWrapperProps = visible ? { visible } : {};

	return <ItemWrapper {...itemWrapperProps}>{children}</ItemWrapper>;
};
