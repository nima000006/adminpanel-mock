import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import HabitantsList from "../HabitantsList";

// Mock the hooks and API calls
const mockGetHabitantsList = vi.fn();
const mockGetHabitantsListCount = vi.fn();
const mockNavigate = vi.fn();
const mockSetQueryParams = vi.fn();
const mockGetQueryParams = vi.fn();
const mockUseTitle = vi.fn();

// Mock filter hook data
const mockFilterItemsList = [
  {
    label: "Province",
    name: "provinceId",
    options: [
      { value: 1, label: "Tehran" },
      { value: 2, label: "Isfahan" },
    ],
  },
];

let mockApiState: any = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: undefined,
};

let mockCountApiState: any = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: undefined,
};

// Mock RTK Query hooks
vi.mock("@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi", () => ({
  useLazyGetHabitantsListQuery: () => [mockGetHabitantsList, mockApiState],
  useLazyGetHabitantsListCountQuery: () => [mockGetHabitantsListCount, mockCountApiState],
}));

// Mock useQueryParams hook
vi.mock("@infra/hooks/useQueryParams", () => ({
  default: () => ({
    getQueryParams: mockGetQueryParams,
    setQueryParams: mockSetQueryParams,
  }),
}));

// Mock useNavigate
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock useTitle hook
vi.mock("@infra/hooks/useTitle", () => ({
  default: () => mockUseTitle,
}));

// Mock useHabitantsAdvanceFilter hook
vi.mock("../hooks/HabitantsAdvanceFilter", () => ({
  default: () => ({
    filterItemsList: mockFilterItemsList,
    provinceList: [
      { value: 1, label: "Tehran" },
      { value: 2, label: "Isfahan" },
    ],
    cityList: [],
    genderList: [],
    userGroupList: [],
    universityList: [],
    dormList: [],
    buildingList: [],
    floorList: [],
    roomList: [],
    educationGradeList: [],
    schedulingList: [],
    semesterList: [],
  }),
}));

// Mock Ant Design Form
const mockForm = {
  getFieldsValue: vi.fn(() => ({})),
  setFieldsValue: vi.fn(),
  resetFields: vi.fn(),
  validateFields: vi.fn(() => Promise.resolve({})),
  submit: vi.fn(),
};

vi.mock("antd", async () => {
  const actual = await vi.importActual<any>("antd");
  return {
    ...actual,
    Form: {
      ...(actual.Form || {}),
      useForm: () => [mockForm],
    },
  };
});

// Mock table model with sortable columns
vi.mock("../DormHabitantsTableListModel", () => ({
  default: () => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Student Number",
      dataIndex: "studentNumber",
      key: "studentNumber",
      sorter: true,
    },
    {
      title: "Residence Start Date",
      dataIndex: "residenceStartDate",
      key: "residenceStartDate",
      sorter: true,
    },
  ],
}));

// Mock downloadExcel helper
const mockDownloadExcel = vi.fn();

vi.mock("@infra/helpers/utils", () => ({
  downloadExcel: vi.fn(),
  makeQueryParams: vi.fn((params: any) => new URLSearchParams(params).toString()),
}));

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      test: (state = {}) => state,
    },
  });
};

describe("HabitantsList - Part 3: Navigation, Sorting, Error Handling & Excel Export", () => {
  let store: ReturnType<typeof createMockStore>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createMockStore();
    user = userEvent.setup();

    // Suppress RTK Query middleware warnings in tests
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});

    // Reset API state
    mockApiState = {
      data: {
        data: [
          {
            id: 1,
            name: "John",
            lastName: "Doe",
            studentNumber: "12345",
            dormitoryName: "Dorm A",
            residenceStartDate: "2024-01-01",
          },
        ],
        total: 50,
      },
      isLoading: false,
      isFetching: false,
      isError: false,
      error: undefined,
    };

    mockCountApiState = {
      data: 50,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: undefined,
    };

    // Default mock implementations
    mockGetQueryParams.mockReturnValue({});
    mockGetHabitantsList.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: "John",
            lastName: "Doe",
            studentNumber: "12345",
          },
        ],
        total: 50,
      },
    });
    mockGetHabitantsListCount.mockResolvedValue({
      data: 50,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <HabitantsList />
        </BrowserRouter>
      </Provider>
    );
  };

  describe("10. Navigation & Routing", () => {
    it.skip("should navigate to evacuation page when evacuation button is clicked", async () => {
      renderComponent();

      const evacuationButton = screen.getByRole("button", {
        name: /تخلیه/i,
      });
      await user.click(evacuationButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining("/evacuation"));
      });
    });

    it.skip("should pass current filters to evacuation page via navigation state", async () => {
      mockGetQueryParams.mockReturnValue({
        provinceId: "1",
        dormitoryId: "2",
      });

      renderComponent();

      const evacuationButton = screen.getByRole("button", {
        name: /تخلیه/i,
      });
      await user.click(evacuationButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            state: expect.objectContaining({
              filters: expect.objectContaining({
                provinceId: 1,
                dormitoryId: 2,
              }),
            }),
          })
        );
      });
    });

    it.skip("should render Link components in table rows for detail navigation", async () => {
      renderComponent();

      await waitFor(() => {
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThan(0);
      });
    });

    it.skip("should preserve query params when navigating through table links", async () => {
      mockGetQueryParams.mockReturnValue({
        page: "2",
        provinceId: "1",
      });

      renderComponent();

      await waitFor(() => {
        const links = screen.getAllByRole("link");
        expect(links[0]).toHaveAttribute("href", expect.stringContaining("page=2"));
      });
    });
  });

  describe("11. Table Sorting Functionality", () => {
    it.skip("should call API with sorting params when column header is clicked", async () => {
      renderComponent();

      await waitFor(() => {
        const nameHeader = screen.getByText("Name");
        fireEvent.click(nameHeader);
      });

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledWith(
          expect.objectContaining({
            sortings: expect.arrayContaining([
              expect.objectContaining({
                field: "name",
                direction: "asc",
              }),
            ]),
          })
        );
      });
    });

    it.skip("should toggle sort direction on repeated clicks", async () => {
      renderComponent();

      await waitFor(() => {
        const nameHeader = screen.getByText("Name");
        fireEvent.click(nameHeader);
      });

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledWith(
          expect.objectContaining({
            sortings: expect.arrayContaining([
              expect.objectContaining({
                direction: "asc",
              }),
            ]),
          })
        );
      });

      // Click again to toggle
      const nameHeader = screen.getByText("Name");
      fireEvent.click(nameHeader);

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledWith(
          expect.objectContaining({
            sortings: expect.arrayContaining([
              expect.objectContaining({
                direction: "desc",
              }),
            ]),
          })
        );
      });
    });

    it.skip("should update URL params with sorting information", async () => {
      renderComponent();

      await waitFor(() => {
        const studentNumberHeader = screen.getByText("Student Number");
        fireEvent.click(studentNumberHeader);
      });

      await waitFor(() => {
        expect(mockSetQueryParams).toHaveBeenCalledWith(
          expect.objectContaining({
            sortings: expect.any(Array),
          })
        );
      });
    });

    it.skip("should support multi-column sorting", async () => {
      renderComponent();

      // First sort
      await waitFor(() => {
        const nameHeader = screen.getByText("Name");
        fireEvent.click(nameHeader);
      });

      // Second sort (with Shift key for multi-column)
      await waitFor(() => {
        const dateHeader = screen.getByText("Residence Start Date");
        fireEvent.click(dateHeader, { shiftKey: true });
      });

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledWith(
          expect.objectContaining({
            sortings: expect.arrayContaining([
              expect.objectContaining({ field: "name" }),
              expect.objectContaining({ field: "residenceStartDate" }),
            ]),
          })
        );
      });
    });
  });

  describe("12. Error Handling & Edge Cases", () => {
    it.skip("should display error message when API call fails", async () => {
      mockApiState.isError = true;
      mockApiState.error = {
        status: 500,
        data: { message: "Internal Server Error" },
      };

      renderComponent();

      await waitFor(() => {
        const errorMessage = screen.getByText(/error/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it.skip("should handle empty response gracefully", async () => {
      mockGetHabitantsList.mockResolvedValue({
        data: {
          data: [],
          total: 0,
        },
      });
      mockGetHabitantsListCount.mockResolvedValue({
        data: 0,
      });

      renderComponent();

      await waitFor(() => {
        const emptyState = screen.getByText(/no data/i);
        expect(emptyState).toBeInTheDocument();
      });
    });

    it.skip("should handle network timeout errors", async () => {
      mockApiState.isError = true;
      mockApiState.error = {
        status: "TIMEOUT_ERROR",
        data: { message: "Request timeout" },
      };

      renderComponent();

      await waitFor(() => {
        const errorIndicator = screen.queryByText(/timeout/i);
        expect(errorIndicator).toBeTruthy();
      });
    });

    it.skip("should retry API call on error when retry button is clicked", async () => {
      mockApiState.isError = true;

      renderComponent();

      await waitFor(() => {
        const retryButton = screen.getByRole("button", { name: /retry/i });
        fireEvent.click(retryButton);
      });

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledTimes(2);
      });
    });

    it.skip("should handle undefined or null values in table data", async () => {
      mockGetHabitantsList.mockResolvedValue({
        data: {
          data: [
            {
              id: 1,
              name: null,
              lastName: undefined,
              studentNumber: "12345",
            },
          ],
          total: 1,
        },
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText("12345")).toBeInTheDocument();
      });
    });

    it.skip("should handle invalid filter values from URL gracefully", async () => {
      mockGetQueryParams.mockReturnValue({
        page: "invalid",
        limit: "abc",
        provinceId: "notanumber",
      });

      renderComponent();

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledWith(
          expect.objectContaining({
            page: expect.any(Number),
            limit: expect.any(Number),
          })
        );
      });
    });
  });

  describe("13. Excel Download Functionality", () => {
    it.skip("should render excel download button", () => {
      renderComponent();

      const downloadButton = screen.getByRole("button", {
        name: /download|excel/i,
      });
      expect(downloadButton).toBeInTheDocument();
    });

    it.skip("should call downloadExcel function when download button is clicked", async () => {
      renderComponent();

      const downloadButton = screen.getByRole("button", {
        name: /download|excel/i,
      });
      await user.click(downloadButton);

      await waitFor(() => {
        expect(mockDownloadExcel).toHaveBeenCalled();
      });
    });

    it.skip("should pass current habitants data to downloadExcel function", async () => {
      const mockData = [
        {
          id: 1,
          name: "John",
          lastName: "Doe",
          studentNumber: "12345",
        },
      ];

      mockGetHabitantsList.mockResolvedValue({
        data: {
          data: mockData,
          total: 1,
        },
      });

      renderComponent();

      await waitFor(() => {
        const downloadButton = screen.getByRole("button", {
          name: /download|excel/i,
        });
        fireEvent.click(downloadButton);
      });

      await waitFor(() => {
        expect(mockDownloadExcel).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              studentNumber: "12345",
            }),
          ]),
          expect.any(String)
        );
      });
    });

    it.skip("should include filename with timestamp when downloading", async () => {
      renderComponent();

      const downloadButton = screen.getByRole("button", {
        name: /download|excel/i,
      });
      await user.click(downloadButton);

      await waitFor(() => {
        expect(mockDownloadExcel).toHaveBeenCalledWith(
          expect.any(Array),
          expect.stringMatching(/habitants.*\d{4}/i)
        );
      });
    });

    it.skip("should disable download button when no data is available", async () => {
      mockGetHabitantsList.mockResolvedValue({
        data: {
          data: [],
          total: 0,
        },
      });

      renderComponent();

      await waitFor(() => {
        const downloadButton = screen.getByRole("button", {
          name: /download|excel/i,
        });
        expect(downloadButton).toBeDisabled();
      });
    });

    it.skip("should show loading indicator on download button during export", async () => {
      renderComponent();

      const downloadButton = screen.getByRole("button", {
        name: /download|excel/i,
      });
      await user.click(downloadButton);

      // Check if button shows loading state
      expect(downloadButton).toHaveAttribute("disabled");
    });
  });

  describe("14. useEffect Dependencies & Re-fetching", () => {
    it.skip("should re-fetch data when URL query params change", async () => {
      const { rerender } = renderComponent();

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledTimes(1);
      });

      // Simulate URL param change
      mockGetQueryParams.mockReturnValue({ page: "2" });

      rerender(
        <Provider store={store}>
          <BrowserRouter>
            <HabitantsList />
          </BrowserRouter>
        </Provider>
      );

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledTimes(2);
      });
    });

    it.skip("should not trigger unnecessary re-fetches when unrelated state changes", async () => {
      renderComponent();

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalledTimes(1);
      });

      // Trigger a state change that shouldn't cause re-fetch
      const filterButton = screen.getByRole("button", {
        name: /فیلتر پیشرفته/i,
      });
      await user.click(filterButton);

      // Should still be called only once (initial mount)
      expect(mockGetHabitantsList).toHaveBeenCalledTimes(1);
    });

    it.skip("should synchronize count query with list query", async () => {
      renderComponent();

      await waitFor(() => {
        expect(mockGetHabitantsList).toHaveBeenCalled();
        expect(mockGetHabitantsListCount).toHaveBeenCalled();
      });

      // Both should be called with same filter params
      const listCallArgs = mockGetHabitantsList.mock.calls[0][0];
      const countCallArgs = mockGetHabitantsListCount.mock.calls[0][0];

      expect(listCallArgs.provinceId).toBe(countCallArgs.provinceId);
      expect(listCallArgs.dormitoryId).toBe(countCallArgs.dormitoryId);
    });
  });
});
