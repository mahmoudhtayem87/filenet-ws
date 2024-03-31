/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
/* global Liferay */

export function capitalizeFirstLetter(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function showError(title, message) {
	Liferay.Util.openToast({message, title, type: 'danger'});
}

export function showSuccess(
	title,
	message = 'The request has been successfully completed.'
) {
	Liferay.Util.openToast({message, title, type: 'success'});
}

