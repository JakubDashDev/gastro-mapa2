import React, { useState } from "react";
import Supercluster from "supercluster";
import { RestaurantType } from "../../redux/restaurantsSlice";
import Rating from "./Rating";
import { FaTimes, FaYoutube } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import Modal from "./Modal";

interface IClusterLeavesModalProps {
  clusterLeaves:
    | Supercluster.PointFeature<{
        cluster: boolean;
        restaurantId: string | undefined;
        restaurant: RestaurantType;
      }>[]
    | undefined;
  setClusterLeaves: React.Dispatch<
    React.SetStateAction<
      | Supercluster.PointFeature<{
          cluster: boolean;
          restaurantId: string | undefined;
          restaurant: RestaurantType;
        }>[]
      | undefined
    >
  >;
}

function ClusterLeavesModal({ clusterLeaves, setClusterLeaves }: IClusterLeavesModalProps) {
  return (
    <Modal isShow={clusterLeaves === undefined ? false : true} setIsShow={() => setClusterLeaves(undefined)}>
      <button
        type="button"
        className="absolute top-0 right-2 text-white text-xl p-2"
        onClick={() => setClusterLeaves(undefined)}
      >
        <FaTimes />
      </button>
      <div className="flex flex-col gap-8 mt-3">
        {clusterLeaves?.map((leaf) => (
          <SingleClusterLeaf key={leaf.properties.restaurantId} clusterLeaf={leaf.properties.restaurant} />
        ))}
      </div>
    </Modal>
  );
}

export default ClusterLeavesModal;

function SingleClusterLeaf({ clusterLeaf }: { clusterLeaf: RestaurantType }) {
  return (
    <div className="flex flex-col gap-2 font-sans text-white pb-4">
      <iframe id="ytplayer" width="350" height="200" src={clusterLeaf?.youtubeEmbed} className="rounded-lg" />
      <div className="flex flex-col pb-1">
        <span className="text-lg">{clusterLeaf?.name}</span>
        {clusterLeaf?.category.map((type: string) => (
          <span key={type} className="text-sm capitalize text-gray-500">
            {type}
          </span>
        ))}
      </div>
      <span className="border-b border-white/5 pb-1">
        {clusterLeaf?.address.street}, {clusterLeaf?.address.zipCode} {clusterLeaf?.address.city}{" "}
      </span>

      <div className="flex justify-between items-center gap-5 pt-1">
        <span className="pb-1">
          <Rating rating={clusterLeaf?.rating || 0} isText />
        </span>
        <div className="flex items-center gap-3">
          <a
            href={clusterLeaf?.youtubeLink}
            target="_blank"
            className="flex justify-center items-center border border-red-500  p-2 text-xl text-red-500  rounded-full transition-all hover:scale-105 "
          >
            <FaYoutube />
          </a>
          <a
            href={clusterLeaf?.googleLink}
            target="_blank"
            className="flex justify-center items-center border border-gray-300 text-gray-300 p-2 text-xl rounded-full transition-all hover:scale-105"
          >
            <BiSolidNavigation />
          </a>
        </div>
      </div>
    </div>
  );
}
