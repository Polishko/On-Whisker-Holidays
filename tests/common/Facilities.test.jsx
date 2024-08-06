import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Facilities from "../../src/components/common/Facilities";

describe("Facilities component", () => {
  const mockHotel = {
    facilities: ["wifi", "airconditioner", "parking", "pool"],
  };

  it("renders WiFi icon and tooltip when 'wifi' in facilities", () => {
    render(<Facilities hotel={mockHotel} />);
    const wifiIcon = screen.getByText("WiFi");
    expect(wifiIcon).toBeInTheDocument();
  });

  it("renders Air conditioner icon and tooltip when 'airconditioner' in facilities", () => {
    render(<Facilities hotel={mockHotel} />);
    const airConditionerIcon = screen.getByText("Air conditioner");
    expect(airConditionerIcon).toBeInTheDocument();
  });

  it("renders Parking icon and tooltip when 'parking' in facilities", () => {
    render(<Facilities hotel={mockHotel} />);
    const parkingIcon = screen.getByText("Parking");
    expect(parkingIcon).toBeInTheDocument();
  });

  it("renders Pool icon and tooltip when 'pool' in facilities", () => {
    render(<Facilities hotel={mockHotel} />);
    const poolIcon = screen.getByText("Pool");
    expect(poolIcon).toBeInTheDocument();
  });

  it("does not render icons or tooltips for facilities not included", () => {
    const mockHotelNoFacilities = { facilities: [] };
    render(<Facilities hotel={mockHotelNoFacilities} />);
    const wifiIcon = screen.queryByText("WiFi");
    const airConditionerIcon = screen.queryByText("Air conditioner");
    const parkingIcon = screen.queryByText("Parking");
    const poolIcon = screen.queryByText("Pool");

    expect(wifiIcon).not.toBeInTheDocument();
    expect(airConditionerIcon).not.toBeInTheDocument();
    expect(parkingIcon).not.toBeInTheDocument();
    expect(poolIcon).not.toBeInTheDocument();
  });
});
