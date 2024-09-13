const o = {
  activeIcon: {
    star: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTY1NV8yNDg4MikiPjxwYXRoIGQ9Ik0xNy44NDcgMy45M2wzLjEgNi41NSA2LjM1My42NzVjMS40MzEuMTUzIDEuOTc1IDEuOTU2Ljg2MiAyLjg3MmwtNS4wNTkgNC4xNzUgMS41NjkgNy4wMDZjLjMxMiAxLjQtMS4yMDcgMi40OS0yLjQzMSAxLjc0N2wtNS44NjMtMy41NjUtNS44NjMgMy41NjVjLTEuMjI1Ljc0NC0yLjc0My0uMzQ3LTIuNDMtMS43NDdsMS41NjgtNy4wMDYtNS4wNi00LjE3MmMtMS4xMTItLjkxNS0uNTY4LTIuNzIyLjg2My0yLjg3Mmw2LjM1LS42NzUgMy4xLTYuNTVjLjU5LTEuMjQ0IDIuMzUzLTEuMjQ0IDIuOTQtLjAwM3oiIGZpbGw9IiNGNjMiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMF8xNjU1XzI0ODgyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDMydjMySDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+",
  },
  inactiveIcon: {
    star: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTcuODI4IDQuMjI1bDMuMSA2LjU1IDYuMzUzLjY3NWMxLjQzMS4xNTMgMS45NzUgMS45NTYuODYzIDIuODcybC01LjA2IDQuMTc1IDEuNTcgNy4wMDZjLjMxMiAxLjQtMS4yMDcgMi40OS0yLjQzMiAxLjc0N2wtNS44NjMtMy41NjYtNS44NjIgMy41NjZjLTEuMjI1Ljc0NC0yLjc0NC0uMzQ3LTIuNDMxLTEuNzQ3bDEuNTY4LTcuMDA2LTUuMDYtNC4xNzJjLTEuMTEyLS45MTYtLjU2OC0yLjcyMi44NjMtMi44NzJsNi4zNS0uNjc1IDMuMS02LjU1Yy41OTEtMS4yNDQgMi4zNTQtMS4yNDQgMi45NDEtLjAwM3oiIGZpbGw9IiNGMkYyRjIiLz48bWFzayBpZD0iYSIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iNCIgeT0iMyIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1Ij48cGF0aCBkPSJNMTcuODQ3IDQuMjI1bDMuMSA2LjU1IDYuMzUzLjY3NWMxLjQzMS4xNTMgMS45NzUgMS45NTYuODYyIDIuODcybC01LjA1OSA0LjE3NSAxLjU2OSA3LjAwNmMuMzEyIDEuNC0xLjIwNyAyLjQ5LTIuNDMxIDEuNzQ3bC01Ljg2My0zLjU2Ni01Ljg2MyAzLjU2NmMtMS4yMjUuNzQ0LTIuNzQzLS4zNDctMi40My0xLjc0N2wxLjU2OC03LjAwNi01LjA2LTQuMTcyYy0xLjExMi0uOTE2LS41NjgtMi43MjIuODYzLTIuODcybDYuMzUtLjY3NSAzLjEtNi41NWMuNTktMS4yNDQgMi4zNTMtMS4yNDQgMi45NC0uMDAzeiIgZmlsbD0iIzIyMTcxNCIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2EpIj48cGF0aCBkPSJNNC4wMTktMS4zMzJoMTIuNjY2djMySDQuMDJ2LTMyeiIgZmlsbD0iI0Q5RDlEOSIvPjwvZz48L3N2Zz4=",
  },
  halfIcon: {
    star: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTcuODI4IDQuMjI1bDMuMSA2LjU1IDYuMzUzLjY3NWMxLjQzMS4xNTMgMS45NzUgMS45NTYuODYzIDIuODcybC01LjA2IDQuMTc1IDEuNTcgNy4wMDZjLjMxMiAxLjQtMS4yMDcgMi40OS0yLjQzMiAxLjc0N2wtNS44NjMtMy41NjYtNS44NjIgMy41NjZjLTEuMjI1Ljc0NC0yLjc0NC0uMzQ3LTIuNDMxLTEuNzQ3bDEuNTY4LTcuMDA2LTUuMDYtNC4xNzJjLTEuMTEyLS45MTYtLjU2OC0yLjcyMi44NjMtMi44NzJsNi4zNS0uNjc1IDMuMS02LjU1Yy41OTEtMS4yNDQgMi4zNTQtMS4yNDQgMi45NDEtLjAwM3oiIGZpbGw9IiNGMkYyRjIiLz48bWFzayBpZD0iYSIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iNCIgeT0iMyIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1Ij48cGF0aCBkPSJNMTcuODQ3IDQuMjI1bDMuMSA2LjU1IDYuMzUzLjY3NWMxLjQzMS4xNTMgMS45NzUgMS45NTYuODYyIDIuODcybC01LjA1OSA0LjE3NSAxLjU2OSA3LjAwNmMuMzEyIDEuNC0xLjIwNyAyLjQ5LTIuNDMxIDEuNzQ3bC01Ljg2My0zLjU2Ni01Ljg2MyAzLjU2NmMtMS4yMjUuNzQ0LTIuNzQzLS4zNDctMi40My0xLjc0N2wxLjU2OC03LjAwNi01LjA2LTQuMTcyYy0xLjExMi0uOTE2LS41NjgtMi43MjIuODYzLTIuODcybDYuMzUtLjY3NSAzLjEtNi41NWMuNTktMS4yNDQgMi4zNTMtMS4yNDQgMi45NC0uMDAzeiIgZmlsbD0iIzIyMTcxNCIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2EpIj48cGF0aCBkPSJNNC4wMTktMS4zMzJoMTIuNjY2djMySDQuMDJ2LTMyeiIgZmlsbD0iI0Y2MyIvPjwvZz48L3N2Zz4=",
  },
};

export function getActiveIcon(type = "star") {
  return o.activeIcon[type];
}
export function getInactiveIcon(type = "star") {
  return o.inactiveIcon[type];
}
export function getHalfIcon(type = "star") {
  return o.halfIcon[type];
}