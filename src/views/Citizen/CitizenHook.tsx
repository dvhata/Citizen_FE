import citizenApi from "api/citizenApi";
import { CitizenData } from "models/Citizen/CitizenData";
import React from "react";

export function useCitizen() {
    const token = localStorage.getItem("token");
    const permission = localStorage.getItem("permission");
    const [list, setList] = React.useState<CitizenData[]>([]);
    const [filter, setFilter] = React.useState<CitizenData>(new CitizenData());


    const LoadList = React.useCallback(
        (filterData: CitizenData) => {
            const fetchCitizenList = async () => {
                try {
                    const res = await citizenApi
                        .getAll(
                            permission,
                            token,
                            filterData?.name,
                            filterData?.ID_number,
                            filterData?.date_of_birth?.format('YYYY-MM-DD HH:mm:ss'),
                            filterData?.gender,
                            filterData?.hometown
                        );
                    setList(res.citizen.data);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchCitizenList();
        }, []);

    React.useEffect(() => {
        const filterData = new CitizenData();
        LoadList(filterData);
    }, []);

    const handleChangeFilter = React.useCallback(
        (property: keyof CitizenData, value: any) => {
            const filterData = filter;
            filterData[`${property}`] = value;
            setFilter(filterData);
            LoadList(filterData);
        },
        [filter, LoadList]
    );

    const handleResetFilter = React.useCallback(
        () => {
            const filterData = new CitizenData();
            setFilter(filterData)
            LoadList(filterData);
        }, []
    );

    const deleteCitizen = React.useCallback(
        (id: any) => {
            const fetchCitizenList = async () => {
                try {
                    const res = await citizenApi
                        .delete(
                            token,
                            id
                        );
                    console.log(res);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchCitizenList();
        }, []);

    return {
        list,
        handleChangeFilter,
        filter,
        handleResetFilter,
        LoadList,
        deleteCitizen,
    };
};