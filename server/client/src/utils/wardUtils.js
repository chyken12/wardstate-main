



export const calculateWardStatistics = (admissions, wardType) => {
  const wardBedCapacity = {
    'Male Medical': 25,
    'Female Medical': 58,
    'Male Surgical': 45,
    'Female Surgical': 45,
    'NICU': 45,
    'Maternity': 45,
    'Kids Ward': 45
  };

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const stats = {
    remainedPreviousNight: 0,
    totalAdmissions: 0,
    totalDischarges: 0,
    totalDeaths: 0,
    transferIn: 0,
    transferOut: 0,
    emptyBeds: wardBedCapacity[wardType] || 0,
    remainedAtMidnight: 0
  };

  admissions.forEach(admission => {
    if (admission.ward !== wardType) return;

    const admissionDate = new Date(admission.admissionDate)

    const dischargeDate = admission.dischargeDate ? new Date(admission.dischargeDate) : null;

    const expiredDate = admission.expiredDate ? new Date(admission.expiredDate) : null;

    const transferInDate= admission.transferInDate? new Date(admission.transferInDate) : null;

    const transferOutDate = admission.transferOutDate ? new Date(admission.transferOutDate) : null;

     // Count total admissions (including those from today)
     if (admissionDate <= new Date()) {
      stats.totalAdmissions++;
    }

    // Count remained from previous night
    if (admissionDate < todayStart && (!dischargeDate || dischargeDate >= todayStart) && (!expiredDate || expiredDate >= todayStart) && (!transferOutDate || transferOutDate >= todayStart)) {
      stats.remainedPreviousNight++;
    }

    // Count discharges for today
    if (dischargeDate && dischargeDate <= todayStart && dischargeDate <= new Date()) {
      stats.totalDischarges++;
    }

    // Count deaths for today
    if (expiredDate && expiredDate <= todayStart && expiredDate <= new Date()) {
      stats.totalDeaths++;
    }

    // Count transfers
    if (transferInDate && new Date(admission.transferInDate) <= todayStart) {
      stats.transferIn++;
    }

    if (transferOutDate && new Date(admission.transferOutDate) <= todayStart) {
      stats.transferOut++;
    }
  });

  // Calculate remained at midnight
  stats.remainedAtMidnight = stats.remainedPreviousNight + stats.totalAdmissions + stats.transferIn - stats.totalDischarges - stats.totalDeaths - stats.transferOut;
  
  // Calculate empty beds
  stats.emptyBeds = Math.max(0, wardBedCapacity[wardType] - stats.remainedAtMidnight);

  return stats;
};