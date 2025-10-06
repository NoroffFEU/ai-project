# Mock Data System

This document describes the JSON mock data system created for the AIMOT task management application.

## Purpose

Provides a well-structured JSON mock data system that accurately represents the task management application's functionality for creating a realistic demo experience for unauthenticated users without backend integration.

## Files Created

- `src/data/mockData.json` - Complete mock data structure following the specified requirements
- `src/data/mockDataSchema.json` - JSON schema for validation

## Mock Data Structure

The JSON includes all required properties:

### Tasks
- Task title (e.g., "Workout")  
- Description (e.g., "I want to workout as a novice, plan me a simple routine to start")
- Color coding/classification
- Due dates (formatted as "11:03 Mon")
- Completion status
- Priority indicators with scores (e.g., "+4.6")

### Categories
- Fitness tasks
- Household chores  
- Work projects
- Personal reminders

### Views
- Today's tasks view with completion metrics (e.g., "2/5")
- Weekly view with day-by-day breakdown
- Task board view with priority scores

### User Data
- Sample username
- Authentication status flags
- UI state indicators

### Export Support
- Exportable formats (PDF, CSV, Text)
- Task groupings for different export contexts

## Usage

The mock data is structured to be easily consumed by the application and supports all the functionality shown in the prototypes. All dates are dynamically calculated relative to the current date.

## Validation

The included JSON schema validates all data types, formats, and required properties to ensure data integrity.