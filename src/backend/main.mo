import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";

actor {
  type ServiceType = {
    #security;
    #housekeeping;
    #medical;
    #construction;
  };

  type Inquiry = {
    name : Text;
    phoneNumber : Text;
    email : Text;
    serviceType : ServiceType;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  let inquiries = Map.empty<Time.Time, Inquiry>();

  public shared ({ caller }) func submitInquiry(
    name : Text,
    phoneNumber : Text,
    email : Text,
    serviceType : ServiceType,
    message : Text,
  ) : async () {
    let timestamp = Time.now();
    let inquiry : Inquiry = {
      name;
      phoneNumber;
      email;
      serviceType;
      message;
      timestamp;
    };
    inquiries.add(timestamp, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort();
  };

  public query ({ caller }) func getInquiryByTimestamp(timestamp : Time.Time) : async Inquiry {
    switch (inquiries.get(timestamp)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) { inquiry };
    };
  };
};
