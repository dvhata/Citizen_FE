import { Modal } from "antd";
import citizenApi from "api/citizenApi";
import { CitizenData } from "models/Citizen/CitizenData";
import { DistrictData } from "models/District/DistrictData";
import { HamletData } from "models/Hamlet/HamletData";
import { ProvinceData } from "models/Province/ProvinceData";
import { WardData } from "models/Ward/WardData";
import React from "react";

export function useCitizen() {
    const token = localStorage.getItem("token");
    const [list, setList] = React.useState<CitizenData[]>([]);
    const [filter, setFilter] = React.useState<CitizenData>(new CitizenData());
    const [permission, setPermisstion] = React.useState(localStorage.getItem("permission"));
    const originProvince = localStorage.getItem("permission")?.substring(0, 2);
    const originDistrict = localStorage.getItem("permission")?.substring(0, 4);
    const originWard = localStorage.getItem("permission")?.substring(0, 6);
    const originHamlet = localStorage.getItem("permission")?.substring(0, 8);
    const [provinceList, setProvinceList] = React.useState<ProvinceData[]>([]);
    const [districtList, setDistrictList] = React.useState<DistrictData[]>([]);
    const [wardList, setWardList] = React.useState<WardData[]>([]);
    const [hamletList, setHamletList] = React.useState<HamletData[]>([]);

    const [selectedProvince, setSelectedProvince] = React.useState<string>();
    const [selectedDistrict, setSelectedDistrict] = React.useState<string>();
    const [selectedWard, setSelectedWard] = React.useState<string>();
    const [selectedHamlet, setSelectedHamlet] = React.useState<string>();

    const [disableProvince, setDisableProvince] = React.useState(false);
    const [disableDistrict, setDisableDistrict] = React.useState(false);
    const [disableWard, setDisableWard] = React.useState(false);
    const [disableHamlet, setDisableHamlet] = React.useState(false);

    console.log(originProvince, originDistrict, originDistrict, originHamlet);
    const LoadListProvince = React.useCallback(
        (id: any) => {
            const fetchProvinceList = async () => {
                try {
                    const res = await citizenApi
                        .provinceList(
                            token,
                            id,
                        );
                    setProvinceList(res.provinces);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchProvinceList();
        }, []);

    const LoadListDistrict = React.useCallback(
        (id: any) => {
            const fetchDistrictList = async () => {
                try {
                    const res = await citizenApi
                        .districtList(
                            token,
                            id,
                        );
                    setDistrictList(res.districts);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchDistrictList();
        }, []);

    const LoadListHamlet = React.useCallback(
        (id: any) => {
            const fetchHamletList = async () => {
                try {
                    const res = await citizenApi
                        .hamletList(
                            token,
                            id,
                        );
                    setHamletList(res.hamlets);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchHamletList();
        }, []);

    const LoadListWard = React.useCallback(
        (id: any) => {
            const fetchWardList = async () => {
                try {
                    const res = await citizenApi
                        .wardList(
                            token,
                            id,
                        );
                    setWardList(res.wards);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchWardList();
        }, []);

    const LoadList = React.useCallback(
        (filterData: CitizenData, permisstion) => {
            const fetchCitizenList = async () => {
                try {
                    const res = await citizenApi
                        .getAll(
                            permisstion,
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
        LoadList(filterData, permission);
        LoadListProvince("");
        if (originProvince?.length === 2) {
            setDisableProvince(true);
            setSelectedProvince(originProvince);
            LoadListProvince(originProvince);
            LoadListDistrict(originProvince);
        }
        if (originDistrict?.length === 4) {
            setDisableDistrict(true);
            setSelectedDistrict(originDistrict);
            LoadListDistrict(originDistrict);
            LoadListWard(originDistrict);
        }

        if (originWard?.length === 6) {
            setDisableWard(true);
            setSelectedWard(originWard);
            LoadListWard(originWard);
            LoadListHamlet(originWard);
        }
        if (originHamlet?.length === 8) {
            setDisableHamlet(true);
            setSelectedHamlet(originHamlet);
            LoadListHamlet(originHamlet);
        }
    }, []);

    const handleChangeFilter = React.useCallback(
        (property: keyof CitizenData, value: any) => {
            const filterData = filter;
            filterData[`${property}`] = value;
            setFilter(filterData);
            LoadList(filterData, permission);
        },
        [filter, LoadList, permission]
    );

    const handleResetFilter = React.useCallback(
        () => {
            const filterData = new CitizenData();
            setFilter(filterData)
            LoadList(filterData, permission);
            setSelectedWard(originWard);
            setSelectedDistrict(originDistrict);
            setSelectedHamlet(originHamlet);
            setSelectedProvince(originProvince);
        }, [permission]
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
                    alert("xóa thành công")
                    LoadList(filter, permission);
                } catch (error) {
                    alert(error);
                }
            };

            Modal.confirm({
                title: ("Bạn có chắc chắn muốn xóa bản ghi này"),
                content: ("Thao tác không thể phục hồi"),
                okType: "danger",
                onOk() {
                    fetchCitizenList();
                },
            });

        }, []);

    const handleChangeProvince = React.useCallback(
        (id: any) => {
            setSelectedProvince(id);
            LoadListDistrict(id);
            LoadList(filter, id);
            setPermisstion(id);
            setSelectedWard(undefined);
            setSelectedDistrict(undefined);
            setSelectedHamlet(undefined);
        }, [LoadListDistrict, filter, LoadList]);

    const handleChangeDistrict = React.useCallback(
        (id: any) => {
            setSelectedDistrict(id);
            LoadList(filter, id);
            setPermisstion(id);
            LoadListWard(id);
        }, [LoadListWard, LoadList, filter]);

    const handleChangeWard = React.useCallback(
        (id: any) => {
            LoadListHamlet(id);
            setSelectedWard(id);
            LoadList(filter, id);
            setPermisstion(id);
        }, [LoadListHamlet, filter, LoadList]);

    const handleChangeHamlet = React.useCallback(
        (id: any) => {
            setSelectedHamlet(id);
            setPermisstion(id);
            LoadList(filter, id);
        }, [filter, LoadList]);

    return {
        list,
        permission,
        handleChangeFilter,
        filter,
        handleResetFilter,
        LoadList,
        deleteCitizen,
        provinceList,
        districtList,
        wardList,
        hamletList,
        disableProvince,
        disableDistrict,
        disableWard,
        disableHamlet,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        selectedHamlet,
        handleChangeProvince,
        handleChangeDistrict,
        handleChangeWard,
        handleChangeHamlet,
    };
};