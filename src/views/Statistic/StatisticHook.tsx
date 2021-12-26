import statisticApi from "api/StatisticApi";
import { DistrictData } from "models/District/DistrictData";
import { HamletData } from "models/Hamlet/HamletData";
import { ProvinceData } from "models/Province/ProvinceData";
import { WardData } from "models/Ward/WardData";
import React from "react";

export function useStatistic() {
    const token = localStorage.getItem("token");
    const [permission, setPermisstion] = React.useState(localStorage.getItem("permission"));
    const [ageStatistic, setAgeStatistic] = React.useState<any>();
    const [genderStatistic, setGenderStatistic] = React.useState<any>();
    const [amountStatistic, setAmountStatistic] = React.useState([]);
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

    const LoadListProvince = React.useCallback(
        (id: any) => {
            const fetchProvinceList = async () => {
                try {
                    const res = await statisticApi
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
                    const res = await statisticApi
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
                    const res = await statisticApi
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
                    const res = await statisticApi
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

    const LoadAgeStatistic = React.useCallback(
        (permisstion) => {
            const fetchStatisticList = async () => {
                try {
                    const res = await statisticApi
                        .age(
                            permisstion,
                            token,
                        );
                    setAgeStatistic(res.data);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchStatisticList();
        }, []);

    const LoadGenderStatistic = React.useCallback(
        (permisstion) => {
            const fetchStatisticList = async () => {
                try {
                    const res = await statisticApi
                        .gender(
                            permisstion,
                            token,
                        );
                    setGenderStatistic(res.data);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchStatisticList();
        }, []);

    const LoadAmountStatistic = React.useCallback(
        (permisstion) => {
            const fetchStatisticList = async () => {
                try {
                    const res = await statisticApi
                        .amount(
                            permisstion,
                            token,
                        );
                    setAmountStatistic(res.data);
                } catch (error) {
                    console.log("error:", error);
                }
            };
            fetchStatisticList();
        }, []);

    React.useEffect(() => {
        LoadListProvince("");
        LoadAgeStatistic("");
        LoadAmountStatistic("");
        LoadGenderStatistic("");
        if (originProvince?.length === 2) {
            setDisableProvince(true);
            setSelectedProvince(originProvince);
            LoadListProvince(originProvince);
            if (originDistrict?.length !== 4) {
                LoadAgeStatistic(originProvince);
                LoadAmountStatistic(originProvince);
                LoadGenderStatistic(originProvince);
            }
        }
        if (originDistrict?.length === 4) {
            setDisableDistrict(true);
            setSelectedDistrict(originDistrict);
            LoadListDistrict(originDistrict);
            if (originWard?.length !== 6) {
                LoadAgeStatistic(originDistrict);
                LoadAmountStatistic(originDistrict);
                LoadGenderStatistic(originDistrict);
            }
        }

        if (originWard?.length === 6) {
            setDisableWard(true);
            setSelectedWard(originWard);
            LoadListWard(originWard);
            if (originHamlet?.length !== 8) {
                LoadAgeStatistic(originDistrict);
                LoadAmountStatistic(originDistrict);
                LoadGenderStatistic(originDistrict);
            }
        }
        if (originHamlet?.length === 8) {
            setDisableHamlet(true);
            setSelectedHamlet(originHamlet);
            LoadListHamlet(originHamlet);
            LoadAgeStatistic(originDistrict);
            LoadAmountStatistic(originDistrict);
            LoadGenderStatistic(originDistrict);
        }
    }, []);

    const handleChangeProvince = React.useCallback(
        (id: any) => {
            setSelectedProvince(id);
            LoadListDistrict(id);
            setPermisstion(id);
            setSelectedWard(undefined);
            setSelectedDistrict(undefined);
            setSelectedHamlet(undefined);
            LoadAgeStatistic(id);
            LoadAmountStatistic(id);
            LoadGenderStatistic(id);
        }, [LoadListDistrict, LoadAgeStatistic, LoadAmountStatistic, LoadGenderStatistic]);

    const handleChangeDistrict = React.useCallback(
        (id: any) => {
            setSelectedDistrict(id);
            setPermisstion(id);
            LoadListWard(id);
            setSelectedHamlet(undefined);
            LoadAgeStatistic(id);
            LoadAmountStatistic(id);
            LoadGenderStatistic(id);
        }, [LoadListWard, LoadAgeStatistic, LoadAmountStatistic, LoadGenderStatistic]);

    const handleChangeWard = React.useCallback(
        (id: any) => {
            LoadListHamlet(id);
            setSelectedWard(id);
            setPermisstion(id);
            setSelectedHamlet(undefined);
            LoadAgeStatistic(id);
            LoadAmountStatistic(id);
            LoadGenderStatistic(id);
        }, [LoadListHamlet, LoadAgeStatistic, LoadAmountStatistic, LoadGenderStatistic]);

    const handleChangeHamlet = React.useCallback(
        (id: any) => {
            setSelectedHamlet(id);
            setPermisstion(id);
            LoadAgeStatistic(id);
            LoadAmountStatistic(id);
            LoadGenderStatistic(id);
        }, [, LoadAgeStatistic, LoadAmountStatistic, LoadGenderStatistic]);

    return {
        ageStatistic,
        genderStatistic,
        amountStatistic,
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