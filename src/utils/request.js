/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 global Liferay
 */
/* global Liferay */

import axios from 'axios';
import {config} from "./constants";
import {showError,showSuccess} from "./util";


export function getServerUrl() {
	if (config.doLocal)
	{
		return config.tempHost
	}
	return Liferay.OAuth2Client.FromUserAgentApplication(config.agentOauthAppId)
		.homePageURL;
}

export async function getOAuthToken() {
	if (config.doLocal)
	{
		return config.tempToken;
	}
	const prom = new Promise((resolve, reject) => {
		Liferay.OAuth2Client.FromUserAgentApplication(config.agentOauthAppId)
			._getOrRequestToken()
			.then(
				(token) => {
					resolve(token.access_token);
				},
				(error) => {
					showError('Error', error);

					reject(error);
				}
			)
			.catch((error) => {
				showError('Error', error);

				reject(error);
			});
	});

	return prom;
}

export async function oAuthRequest(config) {

	return request({
		headers: {
			Authorization: `Bearer ${await getOAuthToken()}`,
		},
		maxRedirects: Infinity,
		...config,
	});
}

export function request(config) {
	return new Promise((resolve, reject) => {
		axios
			.request({
				method: 'get',
				...config,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				console.log(error);
				reject({error, message: error.response.data.error || ''});
			});
	});
}
