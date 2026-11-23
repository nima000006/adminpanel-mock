{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "apps.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "apps.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create unified labels for apps components
*/}}

{{- define "apps.labels" -}}
helm.sh/chart: {{ include "apps.chart" . }}
{{ include "apps.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "apps.selectorLabels" -}}
app.kubernetes.io/name: {{ include "apps.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}


{{- define "apps.common.labels" -}}
helm.sh/chart: {{ include "apps.chart" . }}
{{ include "apps.common.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "apps.common.selectorLabels" -}}
app.kubernetes.io/name: {{ include "apps.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}


{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "apps.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}


{{/*
Create the name of the service account to use
*/}}
{{- define "apps.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "apps.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create a function for adding normal env to deployment in a range
*/}}
{{- define "list-general-envs"}}
{{- range $key, $val := .Values.env }}
- name: {{ $key }}
  value: "{{ $val }}"
{{- end }}
{{- end }}

{{/*
Create a function for adding normal secrets to deployment and create secret in a range
*/}}
{{- define "list-general-secrets-pair"}}
{{- range $key, $val := .Values.secrets }}
{{ $key }}: {{ $val | b64enc }}
{{- end }}
{{- end }}

{{- define "list-general-secrets"}}
{{- $fullName := include "apps.fullname" . -}}
{{- range $key, $val := .Values.secrets }}
- name: {{ $key }}
  valueFrom:
    secretKeyRef:
      name: "{{ $fullName }}"
      key: "{{ $key }}"
{{- end }}
{{- end }}

{{/*
Create a function for adding normal secrets to deployment and create secret in a range
*/}}

{{- define "list-general-existing-secrets"}}
{{- range $key, $val := .Values.existingSecrets }}
- name: {{ $key }}
  valueFrom:
    secretKeyRef:
      name: {{ $val.name }}
      key: {{ $val.key }}
{{- end }}
{{- end }}

{{/*
Create a function for adding hostAliases to deployment and create hostAliases in a range
*/}}

{{- define "list-hostAliases"}}
{{- range $key, $val := .Values.hostAliases }}
- ip: {{ $val }}
  hostnames: 
    - {{ $key | quote }}
{{- end }}
{{- end }}