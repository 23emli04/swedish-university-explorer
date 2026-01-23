export default function formatLeaguePath(leagueName) {
    return leagueName
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .toLowerCase();

}